const subject = `
import vedro

class Scenario(vedro.Scenario):
    # highlight-next-line
    subject = "register new user"

`.trimStart();

const given = `
import vedro

class Scenario(vedro.Scenario):
    subject = "register new user"

    # highlight-start
    # Arrange step: prepare the necessary data for the test
    def given_new_user(self):
        self.user = {"username": "bob", "password": "qweqwe"}

    # highlight-end

`.trimStart();

const when = `
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

const then = `
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

const recap = `
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

const generate = `
import vedro
import httpx
# highlight-start
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

const validate = `
import vedro
import httpx
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

const substitute = `
import vedro
import httpx
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

const final = `
import vedro
import httpx
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

export { subject, given, when, then, recap, generate, validate, substitute, final };
