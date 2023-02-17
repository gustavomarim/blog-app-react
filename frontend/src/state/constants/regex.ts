// REGEX RULES
// email => valida se está seguindo o padrão: example@email.com;
// onlyCharacter => valida se está seguindo o padrão de string somente com letras do alfabeto e também aceita acentos;
// fullName => valida se está seguindo o padrão: Nome Sobrenome;

const regex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  onlyCharacter: /^[a-zA-Z\u00C0-\u00FF\s]+$/,
  fullName: /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
};

export default regex;
