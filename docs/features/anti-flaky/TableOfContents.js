import Link from '@site/src/components/Link';
import React from 'react';

class TableOfContents extends React.Component {

  renderLink(link, label) {
    if (link) {
      return <Link to={link}>{label}</Link>;
    }
    return <Link to="#">{`${label} (coming soon)`}</Link>;
  }

  renderChapter(label, link, isActive) {
    return (
      <li key={link}>
        {isActive ? <b>{label}</b> : this.renderLink(link, label)}
      </li>
    );
  }

  render () {
    const title = this.props.title || "Flaky No More";
    const { current } = this.props;
    const chapters = [
      {label: "Part 1. Preventing Flaky Tests", link: "/docs/features/anti-flaky"},
      {label: "Part 2. Tackling Flaky Tests in CI", link: null},
      {label: "Part 3. Surviving Flakiness", link: null},
    ]
    return (
      <div>
        <b>{title}</b>
        <ul>
          {chapters.map(x => this.renderChapter(x.label, x.link, x.label.indexOf(current) !== -1))}
        </ul>
      </div>
    );
  }

}

export default TableOfContents;
