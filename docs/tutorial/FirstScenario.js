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
    def given_creds(self):
        self.creds = {"username": "Bob", "password": "qweqwe"}

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
    def given_creds(self):
        self.creds = {"username": "Bob", "password": "qweqwe"}

    # highlight-start
    # Act step: perform the primary action
    def when_guest_registers(self):
        self.response = httpx.post(f"{API_URL}/auth/register", self.creds)

    # highlight-end

`.trimStart();

const then = `
import vedro
import httpx

API_URL = "https://chat-api-tutorial.vedro.io/$namespace$"

class Scenario(vedro.Scenario):
    subject = "register new user"

    # Arrange step: prepare the necessary data for the test
    def given_creds(self):
        self.creds = {"username": "Bob", "password": "qweqwe"}

    # Act step: perform the primary action
    def when_guest_registers(self):
        self.response = httpx.post(f"{API_URL}/auth/register", self.creds)

    # highlight-start
    # Assert step: verify that the system behaved as expected
    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

    # highlight-end

`.trimStart();

export { subject, given, when, then };
