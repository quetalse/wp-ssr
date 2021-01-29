import React from "react";
export const _arraySkeleton = (count, Skeleton) => (Array.from(Array(count)).map((item, i) => (<Skeleton key={i}/>)))
