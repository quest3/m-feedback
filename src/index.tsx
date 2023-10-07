import React, { useState } from "react";
import classNames from "classnames";


export interface TouchFeedbackProps {
    disabled?: boolean;
    activeClassName?: string;
    activeStyle?: any;
    children?: any;
    style?: any;
    className?: string;
}

export default function TouchFeedback(props: TouchFeedbackProps) {
    const { children, disabled = false, activeClassName, activeStyle } = props;

    const [active, setActive] = useState(false);

    const triggerEvent = (type: string, isActive: boolean, ev: any) => {
        const eventType = `on${type}`;
        const { children } = props;

        if (children.props[eventType]) {
            children.props[eventType](ev);
        }
        if (isActive !== active) {
            setActive(isActive);
        }
    };

    const onTouchStart = (e: React.TouchEvent) => {
        triggerEvent("TouchStart", true, e);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        triggerEvent("TouchMove", false, e);
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        triggerEvent("TouchEnd", false, e);
    };

    const onTouchCancel = (e: React.TouchEvent) => {
        triggerEvent("TouchCancel", false, e);
    };

    const onMouseDown = (e: React.MouseEvent) => {
        // pc simulate mobile
        triggerEvent("MouseDown", true, e);
    };

    const onMouseUp = (e: React.MouseEvent) => {
        triggerEvent("MouseUp", false, e);
    };

    const onMouseLeave = (e: React.MouseEvent) => {
        triggerEvent("MouseLeave", false, e);
    };

    if (!disabled && active) {
        const { style, className } = children?.props || {};

        return React.cloneElement(children, {
            className: classNames(className, activeClassName),
            style: (activeStyle !== false && !!activeStyle) ? { ...style, ...activeStyle } : style,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            onTouchCancel,
            onMouseDown,
            onMouseUp,
            onMouseLeave,
        });
    }

    return React.cloneElement(children, {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onTouchCancel,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
    });
}
