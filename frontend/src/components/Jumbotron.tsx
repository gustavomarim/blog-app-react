import { ButtonComponent } from './Button';

export const Jumbotron = () => {
  const handleClick = (e: Event) => {
    e.preventDefault();
    console.log('Crie uma Conta');
  };

  return (
    <>
      <div className='p-5 mb-4 bg-light rounded-3'>
        <div className='container-fluid py-5'>
          <h1 className='display-5 fw-bold'>Bem-vindo ao Blog Node.js</h1>

          <p className='col-md-8 fs-4 mb-5'>
            Este é um Blog simples, desenvolvido com Node.js + Express +
            MongoDB. Aqui você encontra diversos conteúdos sobre as novidades do
            mundo da computação.
          </p>

          <ButtonComponent
            variant='primary'
            onClick={handleClick}
            type='submit'
            href='/users/register'
            size={'lg'}
          >
            Crie uma Conta
          </ButtonComponent>
        </div>
      </div>
    </>
  );
};
