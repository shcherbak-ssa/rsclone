import React from 'react';
import './homepage-section.scss';

export type HomepageSectionProps = {
  title: string,
  children: React.ReactNode,
};

export function HomepageSection({
  title, children,
}: HomepageSectionProps) {
  return (
    <div className="homepage-section">
      <div className="homepage-section-header">
        <div className="homepage-section-title">{title}</div>
      </div>
      <div className="homepage-section-content">{children}</div>
    </div>
  );
}
