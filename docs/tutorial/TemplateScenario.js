import React from 'react';
import CodeBlock from '@theme/CodeBlock';

class TemplateScenario extends React.Component {

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
    const newNamespace = this.genRandomString(10);
    if (typeof localStorage === "undefined") {
      return newNamespace;
    }
    const payload = localStorage.getItem(key);
  
    if (payload === null) {
      localStorage.setItem(key, `${newNamespace}|${now}`);
      return newNamespace;
    }

    const [ namespace, timestamp ] = payload.split("|");
    if (now < parseInt(timestamp) + expireAfter) {
      return namespace;
    }

    localStorage.setItem(key, `${newNamespace}|${now}`);
    return newNamespace;
  }

  render () {
    const namespace = this.getNamespace();
    const { block } = this.props;
    const code = block.replace("$namespace$", namespace);

    return (
      <CodeBlock language="python">{code}</CodeBlock>
    );
  }

}

export default TemplateScenario;
