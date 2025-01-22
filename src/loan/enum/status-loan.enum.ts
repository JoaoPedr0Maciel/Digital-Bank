export enum LoanStatus {
  PENDING = 'Pendente',         // Quando o empréstimo foi solicitado, mas ainda está aguardando aprovação.
  APPROVED = 'Aprovado',        // Quando o empréstimo foi aprovado pelo sistema ou administrador.
  REJECTED = 'Rejeitado',       // Quando o empréstimo foi negado.
  IN_PROGRESS = 'Em andamento', // Quando o empréstimo foi aprovado e está em fase de pagamento ou execução.
  COMPLETED = 'Concluído',      // Quando o empréstimo foi totalmente pago ou finalizado.
  CANCELLED = 'Cancelado'       // Quando o empréstimo foi cancelado antes de ser aprovado ou durante a execução.
}
