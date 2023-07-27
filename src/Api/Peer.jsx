class PeerService {
    peer;
  
    constructor() {
      if (!this.peer) {
        this.peer = new RTCPeerConnection({
          iceServers: [
            {
              urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
            },
          ],
        });
      }
    }
  
    async setRemoteDescription(ans) {
      if (this.peer) {
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
      }
    }
  
    async getOffer() {
      if (this.peer) {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
      }
    }
  
    async getAnswer(offer) {
      if (!this.peer) {
        console.error('Peer connection is not initialized.');
        return null;
      }
    console.log(this.peer.iceConnectionState,"lll");
    
      try {
      
        await this.peer.setRemoteDescription(offer);
    
      
        const answer = await this.peer.createAnswer();
    
        
        await this.peer.setLocalDescription(answer);
    
        return answer;
      } catch (error) {
        console.error('Error in getAnswer:', error);
        return null;
      }
    }
    
  }
  
  export default new PeerService();