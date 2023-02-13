export interface TitleProps {
  children: string;
}

export const Title = ({ children }: TitleProps) => {
  return <h2 className='my-4'>{children}</h2>;
};
