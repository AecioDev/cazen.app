// lib/data/task-templates.ts

// 1. Definimos o tipo para uma única tarefa do template
type TemplateTask = {
  title: string;
  monthsBefore?: number;
  notes?: string;
};

// 2. Definimos o tipo para a estrutura completa de um template
interface ITaskTemplate {
  name: string;
  description: string;
  tasks: TemplateTask[]; // Garantimos que o array é do nosso tipo
}

// 3. Definimos o tipo para o nosso objeto principal de templates
interface ITaskTemplates {
  [key: string]: ITaskTemplate;
}

// 4. Aplicamos o tipo ao nosso objeto! Agora o TypeScript sabe tudo.
export const taskTemplates: ITaskTemplates = {
  "padrao-12-meses": {
    name: "Planejamento Padrão (12 Meses)",
    description:
      "Uma checklist completa para organizar seu casamento com um ano de antecedência.",
    tasks: [
      // 10-12 Meses Antes
      { title: "Definir o orçamento geral do casamento", monthsBefore: 12 },
      { title: "Começar a montar a lista de convidados", monthsBefore: 12 },
      {
        title: "Escolher e contratar cerimonialista/assessor",
        monthsBefore: 12,
      },
      {
        title: "Pesquisar e visitar locais para a cerimônia e festa",
        monthsBefore: 11,
      },
      { title: "Definir a data do casamento", monthsBefore: 11 },

      // 8-10 Meses Antes
      { title: "Contratar fotógrafo e videomaker", monthsBefore: 10 },
      { title: "Pesquisar e contratar buffet", monthsBefore: 9 },
      { title: "Contratar a banda ou DJ", monthsBefore: 9 },
      {
        title: "Começar a pesquisar vestidos de noiva e trajes do noivo",
        monthsBefore: 8,
      },

      // 6-8 Meses Antes
      { title: "Contratar decoração e florista", monthsBefore: 7 },
      { title: "Enviar o 'Save the Date' para os convidados", monthsBefore: 6 },
      { title: "Reservar hotel para a noite de núpcias", monthsBefore: 6 },
      { title: "Comprar/encomendar o vestido da noiva", monthsBefore: 6 },

      // 4-6 Meses Antes
      { title: "Definir o cardápio e bebidas", monthsBefore: 5 },
      { title: "Comprar as alianças", monthsBefore: 5 },
      { title: "Contratar serviço de bar", monthsBefore: 4 },
      { title: "Encomendar o bolo e os doces", monthsBefore: 4 },

      // 2-3 Meses Antes
      { title: "Enviar os convites oficiais", monthsBefore: 3 },
      { title: "Definir o traje do noivo", monthsBefore: 3 },
      { title: "Fazer a degustação do buffet, bolo e doces", monthsBefore: 2 },

      // 1 Mês Antes
      { title: "Fazer o teste de cabelo e maquiagem", monthsBefore: 1 },
      { title: "Confirmar todos os serviços contratados", monthsBefore: 1 },
      {
        title: "Montar o cronograma do dia do casamento com o cerimonial",
        monthsBefore: 1,
      },

      // Semana do Casamento
      { title: "Fazer a última prova do vestido", monthsBefore: 0 },
      { title: "Preparar as malas para a lua de mel", monthsBefore: 0 },
      { title: "Relaxar e cuidar de si!", monthsBefore: 0 },
    ],
  },
};
