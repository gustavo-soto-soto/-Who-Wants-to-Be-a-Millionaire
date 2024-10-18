export default class AudioPlayer {
    private letsPlayAudio: string = "/audio/lets-play.mp3" 
    private correctAnswer: string = "/audio/correct-answer.mp3" 
    private wrongAnswer: string = "/audio/wrong-answer.mp3" 
    private endAudio: string = "/audio/end.mp3" 
    private wildcardAudio: string = "/audio/wildcard.mp3"

    public letsPlay(): void {
        const audio = new Audio(this.letsPlayAudio)
        audio.play()
    }

    public correct(): void {
        const audio = new Audio(this.correctAnswer)
        audio.play()
    }

    public wrong(): void {
        const audio = new Audio(this.wrongAnswer)
        audio.play()
    }

    public end(): void {
        const audio = new Audio(this.endAudio)
        audio.play()
    }

    public wildcard(): void {
        const audio = new Audio(this.wildcardAudio)
        audio.play()
    }
}