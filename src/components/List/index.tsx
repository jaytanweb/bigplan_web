import React, {
  // 类型
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  Ref,
  // 方法
  useState,
  useEffect,
  useRef,
} from 'react';

/**
 *  默认列表
 *
 *  @description 可指定列数量
 */

export enum Col {
  c24 = 24,
  c12 = 12,
  c8 = 8,
  c6 = 6,
  c4 = 4,
  c3 = 3,
  c2 = 2,
  c1 = 1,
}

interface DefaultListProps {
  col?: Col | number;
  gutter?: number;
  style?: CSSProperties;
}

function DefaultList(props: PropsWithChildren<DefaultListProps>) {
  const { children, gutter = 16, col, style = {} } = props;
  const list = React.Children.toArray(children);
  const len = list.length;

  return (
    <div style={{ width: '100%', ...style }}>
      <ul
        style={{
          display: 'flex',
          width: `100%`,
          flexWrap: 'wrap',
        }}
      >
        {list.map((child: ReactNode, i: number) => (
          <li
            key={i}
            style={{
              width: `calc( (100% - ${gutter * (col - 1)}px) / ${col} )`,
              borderRadius: 16,
              marginBottom: Math.ceil((i + 1) / col) < len / col ? gutter : 0,
              marginRight: (i + 1) % col ? gutter : 0,
            }}
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 *  滚动列表
 *
 *  @description 元素固定宽度， 超出后横向滚动
 */

interface ScrollListProps {
  gutter?: number;
  style?: CSSProperties;
}

function ScollList(props: PropsWithChildren<ScrollListProps>) {
  const { children, gutter = 16, style = {} } = props;

  const list = React.Children.toArray(children);
  const len = list.length;

  return (
    <div style={{ width: '100%', overflowX: 'auto', ...style }}>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
        }}
      >
        {list.map((child: ReactNode, i: number) => (
          <li
            key={i}
            style={{
              flexShrink: 0,
              marginRight: i === len - 1 ? 0 : gutter,
              borderRadius: 16,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SlideListProps {
  gutter?: number;
  style?: CSSProperties;
}

function SlidesList(props: PropsWithChildren<SlideListProps>) {
  const { children, gutter = 16, style = {} } = props;
  const list = React.Children.toArray(children);
  const len = list.length;

  const [active, setActive] = useState<number>(1);
  const [position, setPosition] = useState<number>(0);
  const [rect, setRect] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const ref = useRef<HTMLUListElement>(null);

  // 修改 active
  useEffect(() => {
    console.log(2);
    let timer = setInterval(() => {
      setActive(active + 1 >= len ? 0 : active + 1);
    }, 3000);

    // return () => {
    //   clearInterval(timer);
    //   timer = null;
    // };
  }, []);

  // 修改位置
  useEffect(() => {
    console.log(3);
    // 如果达到第最后一张，则直接跳回第一张
    if (active === 1) setPosition(0);

    // 计算宽度， 计算移动位置
    const nextPosition = position + rect.width;
    console.log(nextPosition);

    // 逐帧变至下一位置
    // let timer = setInterval(() => {
    //   setPosition(position + rect.width / 100);

    //   if (position >= nextPosition) {
    //     setPosition(nextPosition);
    //     clearInterval(timer);
    //     timer = null;
    //   }
    // }, 10);
    // return () => {
    //   if (timer) {
    //     clearInterval(timer);
    //     timer = null;
    //   }
    // };
  }, [active]);

  // 计算高度
  useEffect(() => {
    console.log(1);
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      console.log(rect);
      setRect({ width: rect.width, height: rect.height });
    }
  }, [active]);

  return (
    <div
      style={{
        width: '100%',
        height: rect.height,
        position: 'relative',
        // overflow: 'hidden',
        ...style,
      }}
    >
      {/* 内容 */}
      <ul
        ref={ref}
        style={{
          display: 'flex',
          width: `calc(100% * ${len + 1} + ${len * gutter}px)`,
          flexWrap: 'nowrap',
          position: 'absolute',
          top: 0,
          left: position,
        }}
      >
        {list.concat([list[0]]).map((child, i) => (
          <li
            key={i}
            style={{
              width: '100%',
              marginRight: i === len ? 0 : gutter,
              borderRadius: 16,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {child}
          </li>
        ))}
      </ul>

      {/* 标识点 */}
      <ul
        style={{
          position: 'absolute',
          bottom: 12,
          left: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {list.map((_, i) => (
          <li
            style={{
              width: 10,
              height: 10,
              background: active === i ? 'red' : '#fff',
              borderRadius: '50%',
              margin: '0 8px',
            }}
          />
        ))}
      </ul>
    </div>
  );
}
const List = {
  Default: DefaultList,
  Scoll: ScollList,
  Slides: SlidesList,
};
export default List;
