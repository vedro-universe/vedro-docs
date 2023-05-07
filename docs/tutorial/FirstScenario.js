import React from 'react';
import CodeBlock from '@theme/CodeBlock';

const scenarioCode = `
# ./scenarios/register_new_user.py
import vedro
import httpx

API_URL = "https://chat-api-tutorial.vedro.io/<namespace>"


class Scenario(vedro.Scenario):
    subject = "register new user"

    # Arrange step: prepare the necessary data for the test
    def given_creds(self):
        self.creds = {"username": "Bob", "password": "qweqwe"}

    # Act step: perform the primary action
    def when_guest_registers(self):
        self.response = httpx.post(f"{API_URL}/auth/register", self.creds)

    # Assert step: verify that the system behaved as expected
    def then_it_should_return_success_response(self):
        assert self.response.status_code == 200

`.trimStart();


class FirstScenario extends React.Component {

  genRandomString(length) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      result += alphabet[randomIndex];
    }
  
    return result;
  }

  getTimestamp() {
    return Math.floor(Date.now() / 1000);
  }

  getNamespace() {
    const key = "tutorial_chat_api_namespace";
    const expireAfter = 3600 * 24;

    const now = this.getTimestamp();
    const payload = localStorage.getItem(key);
  
    if (payload === null) {
      const newNamespace = this.genRandomString(10);
      localStorage.setItem(key, `${newNamespace}|${now}`);
      return newNamespace;
    }

    const [ namespace, timestamp ] = payload.split("|");
    if (now < parseInt(timestamp) + expireAfter) {
      return namespace;
    }

    const newNamespace = this.genRandomString(10);
    localStorage.setItem(key, `${newNamespace}|${now}`);
    return newNamespace;
  }

  render () {
    const namespace = this.getNamespace();
    const code = scenarioCode.replace("<namespace>", namespace);

    return (
      <CodeBlock language="python" showLineNumbers>{code}</CodeBlock>
    );
  }

}

export default FirstScenario;
