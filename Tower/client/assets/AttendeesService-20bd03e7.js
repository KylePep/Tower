import{x as a,l as c,A as s}from"./index-e7714abf.js";class i{constructor(t){this.id=t.id,this.eventId=t.eventId,this.accountId=t.accountId,this.profile=t.profile,this.event=t.event}}class r{async getTicketsByEventId(t){const e=await a.get(`api/events/${t}/tickets`);c.log("[TICKETS]",e.data),s.attendees=e.data.map(o=>new i(o))}async createTicket(t){const e=await a.post("api/tickets",t);c.log("[CREATE TICKET]",e.data),s.activeEvent.ticketCount++,s.attendees.push(new i(e.data))}async getMyTickets(){if(!s.account.id)return;c.log(s.account.id);const t=await a.get("account/tickets");c.log("[MyTickets]",t.data),s.myTickets=t.data.map(e=>new i(e))}async removeTicket(t){await a.delete(`api/tickets/${t}`),s.myTickets=s.myTickets.filter(e=>e.id!=t)}}const p=new r;export{p as a};
