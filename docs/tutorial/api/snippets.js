const registerScenarioSubject = `
import vedro

class Scenario(vedro.Scenario):
    # highlight-next-line
    subject = "register new user"

`.trimStart();

const registerScenarioGiven = `
import vedro

class Scenario(vedro.Scenario):
    subject = "register new user"

    # highlight-start
    # Arrange step: prepare the necessary data for the test
    def given_new_user(self):
        self.user = {"username": "bob", "password": "qweqwe"}

    # highlight-end

`.trimStart();

const registerScenarioWhen = `
import vedro
# highlight-start
import httpx

API_URL = "https://chat-api-tutorial.vedro.io/$namespace$"
# highlight-end

class Scenario(vedro.Scenario):
    subject = "register new user"

    # Arrange step: prepare the necessary data for the test
    def given_new_user(self):
        self.user = {"username": "bob", "password": "qweqwe"}

    # highlight-start
    # Act step: perform the primary action
    def when_guest_registers(self):
        self.response = httpx.post(f"{API_URL}/auth/register", json=self.user)

    # highlight-end

`.trimStart();

const registerScenarioThen = `
import vedro
import httpx

API_URL = "https://chat-api-tutorial.vedro.io/$namespace$"

class Scenario(vedro.Scenario):
    subject = "register new user"

    # Arrange step: prepare the necessary data for the test
    def given_new_user(self):
        self.user = {"username": "bob", "password": "qweqwe"}

    # Act step: perform the primary action
    def when_guest_registers(self):
        self.response = httpx.post(f"{API_URL}/auth/register", json=self.user)

    # highlight-start
    # Assert step: verify that the system behaved as expected
    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

    # highlight-end

`.trimStart();

const registerScenarioRecap = `
import vedro
import httpx

API_URL = "https://chat-api-tutorial.vedro.io/$namespace$"

class Scenario(vedro.Scenario):
    subject = "register new user"

    # Arrange step: prepare the necessary data for the test
    def given_new_user(self):
        self.user = {"username": "bob", "password": "qweqwe"}

    # Act step: perform the primary action
    def when_guest_registers(self):
        self.response = httpx.post(f"{API_URL}/auth/register", json=self.user)

    # Assert step: verify that the system behaved as expected
    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

`.trimStart();

const registerScenarioGenerate = `
import vedro
import httpx
# highlight-start
from d42 import fake
from schemas.user import NewUserSchema
# highlight-end

class Scenario(vedro.Scenario):
    subject = "register new user"

    # highlight-start
    def given_new_user(self):
        self.user = fake(NewUserSchema)
    # highlight-end

    def when_guest_registers(self):
        self.response = httpx.post(f"{API_URL}/auth/register", json=self.user)

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

`.trimStart();

const registerScenarioValidate = `
import vedro
import httpx
from d42 import fake
from schemas.user import NewUserSchema

class Scenario(vedro.Scenario):
    subject = "register new user"

    def given_new_user(self):
        self.user = fake(NewUserSchema)

    def when_guest_registers(self):
        self.response = httpx.post(f"{API_URL}/auth/register", json=self.user)

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

    # highlight-start
    def and_then_it_should_return_created_user(self):
        assert self.response.json() == NewUserSchema
    # highlight-end
`.trimStart();

const registerScenarioSubstitute = `
import vedro
import httpx
from d42 import fake
from schemas.user import NewUserSchema

class Scenario(vedro.Scenario):
    subject = "register new user"

    def given_new_user(self):
        self.user = fake(NewUserSchema)

    def when_guest_registers(self):
        self.response = httpx.post(f"{API_URL}/auth/register", json=self.user)

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

    # highlight-start
    def and_then_it_should_return_created_user(self):
        assert self.response.json() == NewUserSchema % {
            "username": self.user["username"],
            "password": self.user["password"],
        }
    # highlight-end
`.trimStart();

const registerScenarioFinal = `
import vedro
import httpx
from d42 import fake
from schemas.user import NewUserSchema

API_URL = "https://chat-api-tutorial.vedro.io/$namespace$"

class Scenario(vedro.Scenario):
    subject = "register new user"

    def given_new_user(self):
        self.user = fake(NewUserSchema)

    def when_guest_registers(self):
        self.response = httpx.post(f"{API_URL}/auth/register", json=self.user)

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

    def and_then_it_should_return_created_user(self):
        assert self.response.json() == NewUserSchema % self.user
`.trimStart();

const loginScenarioWithoutContext = `
import vedro
import httpx
from d42 import fake
from schemas.user import NewUserSchema

API_URL = "https://chat-api-tutorial.vedro.io/$namespace$"

class Scenario(vedro.Scenario):
    subject = "login as registered user"

    def given_user(self):
        self.user = fake(NewUserSchema)

    # highlight-start
    def when_user_logs_in(self):
        self.response = httpx.post(f"{API_URL}/auth/login", json=self.user)
    # highlight-end

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200
`.trimStart();

const registeredUserContext = `
# ./contexts/registered_user.py
import vedro
import httpx

API_URL = "https://chat-api-tutorial.vedro.io/$namespace$"

@vedro.context
def registered_user(user):
    response = httpx.post(f"{API_URL}/auth/register", json=user)
    response.raise_for_status()
    return
`.trimStart();

const loginScenarioWithContext = `
import vedro
import httpx
from d42 import fake
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

    def when_user_logs_in(self):
        self.response = httpx.post(f"{API_URL}/auth/login", json=self.user)

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

`.trimStart();

const loginScenarioValidateToken = `
import vedro
import httpx
from d42 import fake
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

    def when_user_logs_in(self):
        self.response = httpx.post(f"{API_URL}/auth/login", json=self.user)

    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

    # highlight-start
    def and_it_should_return_created_token(self):
        assert self.response.json() == AuthTokenSchema % {
            "username": self.user["username"]
        }
    # highlight-end
`.trimStart();

const configApiUrl = `
# ./config.py
import vedro.config as cfg

class Config(cfg.Config):
    class Api(cfg.Section):
        URL = "https://chat-api-tutorial.vedro.io/$namespace$"
`.trimStart();

export {
  registerScenarioSubject,
  registerScenarioGiven,
  registerScenarioWhen,
  registerScenarioThen,
  registerScenarioRecap,
  registerScenarioGenerate,
  registerScenarioValidate,
  registerScenarioSubstitute,
  registerScenarioFinal,
  loginScenarioWithoutContext,
  registeredUserContext,
  loginScenarioWithContext,
  loginScenarioValidateToken,
  configApiUrl,
};
