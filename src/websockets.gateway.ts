import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Bid } from "./modules/bid/bid.entity";
import { BidView } from "./modules/bid/dto/bid.view";

@WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) { 
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('newBid')
  async sendBidToClients(bid: BidView) {
    this.server.emit('newBid', bid);
  }
}
