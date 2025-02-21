export interface UserEvent {
  userId: string;
  eventType: 'login' | 'logout' | 'file_open' | 'file_save';
  timestamp: number;
}