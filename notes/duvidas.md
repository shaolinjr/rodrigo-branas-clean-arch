# Dúvidas:


- No exemplo abaixo não seria melhor retornar `null` ao invés de lançar uma exceção?:
  ``` typescript
  // RideRepository.ts
    async getRideById(rideId: string): Promise<Ride> {
      const [rideData] = await this.connection?.query("select * from ccca.ride where ride_id = $1", [rideId]);
      if (!rideData) throw new Error("Ride not found");
      return new Ride(rideData.ride_id, rideData.passenger_id, parseFloat(rideData.from_lat), parseFloat(rideData.from_long), parseFloat(rideData.to_lat), parseFloat(rideData.to_long), rideData.status, rideData.date);
    }
  ```

- Entidades relacionadas:
  - Uma é uma Lista
  - A outra é um Item da Lista, onde a razão de existência depende da lista (entidade pai)
  - Ter um ou dois repositórios? Centralizar a gestão da invariância dentro da lista ou dividir?
  - O Item da Lista tem um atributo que é uma outra entidade e que é uma Lista. Esse atributo é criado/populado posteriormente. Devo ter um repositório para esse terceiro item na hierarquia ou devo ter um repositório para o Item da Lista e ele faz o controle desses elementos? Ou tudo deve ficar sob resposabilidade da primeira entidade que iniciou a hierarquia?
  - A resposta é pensar no ciclo de vida das entidades. Se o ciclo de vida está relacionado, então faz sentido ter tudo dentro de um mesmo local e centralizado.

- Nossa pasta infra agregam as camadas de interface adapters e frameworks & drivers? Sim

- Ao atualizar a entidade, devo ter alguma forma de enviar somente o que mudou da entidade para atualizar?
  - É possível, o desenvolvedor escolhe, otimização na persistência não fere nenhum padrão

- Domain Service pode consultar repositório?
  - Não. Deve ser somente no nível de domínio e deve se manter independente