import './style.css';

import { useMemo, useRef, useState, useEffect, useCallback, memo } from 'react';
import { useTimeout, useDebounce, useDebouncedSearchQuery } from '../hooks/hooks';

export default function RenderChildrenApp() {
  return (
    <div className="CssApp">
      <h1>Css Sandbox</h1>

      <h2>Grid Layouts</h2>

      <h3>Grid 1</h3>
      <div className="grid grid1">
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
        <span>E</span>
        <span>F</span>
        <span>G</span>
        <span>H</span>
      </div>

      <h3>Grid 2</h3>
      <div className="grid grid2">
        <span className="left">Left Side</span>
        <span className="line1">Right Line 1</span>
        <span className="line2">Right Line 2</span>
        <span className="line3">Right Line 3</span>
      </div>

      <h3>Grid 3</h3>
      <div className="grid grid3">
        <span className="top">Top Header</span>
        <span className="sidebar1">Sidebar 1</span>
        <span className="sidebar2">Sidebar 2</span>
        <span className="footer">Footer</span>
        <span className="content">
          Content
          <div className="grid grid1">
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>
            <span>E</span>
            <span>F</span>
            <span>G</span>
            <span>H</span>
          </div>
        </span>
      </div>

    </div>
  );
}
