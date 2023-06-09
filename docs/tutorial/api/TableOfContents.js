import React from 'react';
import Link from '@docusaurus/Link';

class TableOfContents extends React.Component {

  renderChapter(label, link, isActive) {
    return (
      <li key={link}>
        {isActive ? <b>{label}</b> : <Link to={link}>{label}</Link>}
      </li>
    );
  }

  render () {
    const title = this.props.title || "Tutorial";
    const { current } = this.props;
    const chapters = [
      {label: "Chapter 1 — First Steps", link: "./chapter1-first-steps"},
      {label: "Chapter 2 — Data Models", link: "./chapter2-data-models"},
      {label: "Chapter 3 — Contexts", link: "./chapter3-contexts"},
      {label: "Chapter 4 — Interfaces", link: "./chapter4-interfaces"},
      {label: "Chapter 5 — Finale", link: "./chapter5-finale"},
    ]
    return (
      <div>
        <b>{title}</b>
        <ul>
          {chapters.map(x => this.renderChapter(x.label, x.link, x.link.indexOf(current) !== -1))}
        </ul>
      </div>
    );
  }

}

export default TableOfContents;
