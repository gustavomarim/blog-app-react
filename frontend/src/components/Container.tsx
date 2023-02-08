interface ContainerProps {
  children: any;
}

export const Container = (props: ContainerProps) => {
  return <div className='container mt-4'>{props.children}</div>;
};
