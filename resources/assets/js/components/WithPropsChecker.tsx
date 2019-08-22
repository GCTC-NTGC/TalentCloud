import React from "react";

interface Props<P> {
  [key: string]: any;
}

/**
 * This is a HOC (Higher Order Component).
 * It can be used to log which properties of a component changed when it re-rerenders.
 * Use it by wrapping the exported component function, similarly to connect() or injectIntl().
 * For Debugging use only.
 * @param WrappedComponent
 */
export default function withPropsChecker<P>(
  WrappedComponent: React.ComponentType<P>,
): React.ComponentClass<Props<P>> {
  return class PropsChecker extends React.Component<Props<P>> {
    public componentWillReceiveProps(nextProps: Props<P>): void {
      if (process.env.NODE_ENV === "development") {
        this.logChanges(nextProps);
      }
    }

    private logChanges(nextProps: Props<P>): void {
      Object.keys(nextProps)
        // eslint-disable-next-line react/destructuring-assignment
        .filter((key): boolean => nextProps[key] !== this.props[key])
        .forEach((key): void => {
          console.log(
            WrappedComponent.name,
            "changed property:",
            key,
            "from",
            // eslint-disable-next-line react/destructuring-assignment
            this.props[key],
            "to",
            nextProps[key],
          );
        });
    }

    public render(): React.ReactElement {
      // @ts-ignore
      return <WrappedComponent {...this.props} />;
    }
  };
}
