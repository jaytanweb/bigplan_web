import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

/****************
 * 函数测试
 ****************/

function sum(a, b) {
  return a + b;
}

describe('测试 sum', () => {
  it('sum_test_1', () => {
    expect(sum(1, 2)).toBe(3);
  });
  it('sum_test_2', () => {
    expect(sum(2, 2)).not.toBe(5);
  });
});

/****************
 * 组件测试
 ****************/
function Display({ num }) {
  return <div className="display">{num}</div>;
}

describe('测试 Display 组件', () => {
  afterEach(cleanup);

  it('检查展示', () => {
    const { container } = render(<Display num={10} />);
    const dom = container.querySelector('.display');
    expect(dom.innerHTML).toBe('10');
  });
});
