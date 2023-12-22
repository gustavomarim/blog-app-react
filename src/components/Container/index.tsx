export interface ContainerProps {
  children: React.ReactNode;
}

export const Container = (props: ContainerProps) => {
  return <section className='container mt-4'>{props.children}</section>;
};
