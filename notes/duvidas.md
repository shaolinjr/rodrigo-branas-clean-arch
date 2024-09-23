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