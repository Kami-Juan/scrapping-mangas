import { UniqueEntityID } from "../UniqueEntityId";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId (): UniqueEntityID;
}