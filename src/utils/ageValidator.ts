export function ageValidator(age) {
  const ano_atual = new Date().getFullYear();
  const data_aniversario = age;
  const ano_informado = data_aniversario.split('/')[2];

  const idade = ano_atual - ano_informado;
  return idade;
}
