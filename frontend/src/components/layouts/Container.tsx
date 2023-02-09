export interface ContainerProps {
  children: React.ReactNode;
}

export const Container = (props: ContainerProps) => {
  return <div className='container mt-4'>{props.children}</div>;
};
