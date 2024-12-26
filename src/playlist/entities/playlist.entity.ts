export class Playlist { }
export class Song {
    id: number
    readable: boolean
    title: string
    title_short: string
    title_version: string
    link: string
    duration: number
    rank: number
    explicit_lyrics: boolean
    explicit_content_lyrics: number
    explicit_content_cover: number
    preview: string
    md5_image: string
    artist: any
    album: any
    contributors?: any
    // artist: ArtistBrief
    // album: Album | AlbumBrief
    // contributors?: Artist[]
    type: string
}