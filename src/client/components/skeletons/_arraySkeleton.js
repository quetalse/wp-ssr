import React from "react";
export default (count, Skeleton) => (Array.from(Array(count)).map((item, i) => (<Skeleton key={i}/>)))
