export class Usuario {
  constructor(
    public usuarioId: number,
    public nombre: string,
    public username: string,
    public password: string,
    public rolId: number,
    public personaId: number,
    public estado: boolean
  )
  {}
}
