const firstAttempt = `
import vedro
import httpx
from schemas.user import NewUserSchema

API_URL = "https://chat-api-tutorial.vedro.io/$namespace$"

class Scenario(vedro.Scenario):
    subject = "login as registered user"

    def given_user(self):
        self.user = fake(NewUserSchema)

    # highlight-start
    def when_user_logins(self):
        self.response = httpx.post(f"{API_URL}/auth/login", json=self.user)
    # highlight-end

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200
`.trimStart();

const context = `
# ./contexts/registered_user.py
import vedro
import httpx

API_URL = "https://chat-api-tutorial.vedro.io/$namespace$"

@vedro.context
def registered_user(user):
    response = httpx.post(f"{API_URL}/auth/register", user)
    response.raise_for_status()
    return response.json()
`.trimStart();

const withContext = `
import vedro
import httpx
from schemas.user import NewUserSchema
# highlight-start
from contexts.registered_user import registered_user
# highlight-end

API_URL = "https://chat-api-tutorial.vedro.io/$namespace$"

class Scenario(vedro.Scenario):
    subject = "login as registered user"

    def given_user(self):
        self.user = fake(NewUserSchema)
        # highlight-start
        registered_user(self.user)
        # highlight-end

    def when_user_logins(self):
        self.response = httpx.post(f"{API_URL}/auth/login", json=self.user)

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

`.trimStart();

const withTokenValidation = `
import vedro
import httpx
from schemas.user import NewUserSchema
from contexts.registered_user import registered_user
# highlight-start
from schemas.token import AuthTokenSchema
# highlight-end

API_URL = "https://chat-api-tutorial.vedro.io/$namespace$"

class Scenario(vedro.Scenario):
    subject = "login as registered user"

    def given_user(self):
        self.user = fake(NewUserSchema)
        registered_user(self.user)

    def when_user_logins(self):
        self.response = httpx.post(f"{API_URL}/auth/login", json=self.user)

    # highlight-start
    def and_it_should_return_created_token(self):
        assert self.response.json() == AuthTokenSchema % {
            "username": self.user["username"]
        }
    # highlight-end
`.trimStart();

export { firstAttempt, context, withContext, withTokenValidation };
