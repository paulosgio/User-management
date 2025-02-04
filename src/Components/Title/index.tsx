import React from "react";

interface ITitleProps {
    children: React.ReactNode,
    style?: string
}

export default function Title({ children, style }: ITitleProps) {
    return <h1 className={`text-4xl font-thin ${style}`}>{children}</h1>
}