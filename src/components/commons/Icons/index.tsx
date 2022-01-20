import React from 'react';
import { Icon } from './Icon';

export const AccountIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
  >
    <path d="M24 8c-4.42 0-8 3.58-8 8 0 4.41 3.58 8 8 8s8-3.59 8-8c0-4.42-3.58-8-8-8zm0 20c-5.33 0-16 2.67-16 8v4h32v-4c0-5.33-10.67-8-16-8z" />
    <path fill="none" d="M0 0h48v48h-48z" />
  </svg>
);

export const LoadingIcon = (props: Icon) => (
  <svg
    version="1.1"
    id="loader-1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width={props.width || '40px'}
    height={props.width || '40px'}
    viewBox="0 0 40 40"
  >
    <path
      opacity="0.2"
      fill="#000"
      d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
    />
    <path
      fill="#000"
      d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 20 20"
        to="360 20 20"
        dur="0.5s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export const DownArrowIcon = (props: Icon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className || ''}
    width={props.width || '10'}
    height={props.height || '10'}
    viewBox="0 0 32 32"
  >
    <title>2-Arrow Down</title>
    <g id="_2-Arrow_Down" data-name="2-Arrow Down">
      <path d="M26.29,20.29,18,28.59V0H16V28.59L7.71,20.29,6.29,21.71l10,10a1,1,0,0,0,1.41,0l10-10Z" />
    </g>
  </svg>
);

export const UpArrowIcon = (props: Icon) => (
  <svg
    id="_1-Arrow_Up"
    className={props.className || ''}
    width={props.width || '10'}
    height={props.height || '10'}
    data-name="1-Arrow Up"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
  >
    <title>1-Arrow Up</title>
    <path d="M26.71,10.29l-10-10a1,1,0,0,0-1.41,0l-10,10,1.41,1.41L15,3.41V32h2V3.41l8.29,8.29Z" />
  </svg>
);
