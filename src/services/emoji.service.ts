const EMOJI_API_ORIGIN_HREF: string = 'https://emoji-api.com/emojis';
const ACCESS_KEY_LABEL: string = 'access_key';
const ACCESS_KEY_VALUE: string = 'bf80248d5b30b820318c65c695fec9e68b952d6f';
const START_UNIQUE_EMOJI_INDEX: number = 0;
const LAST_UNIQUE_EMOJI_INDEX: number = 1792;

export class EmojiService {
  private access_key: string = `${ACCESS_KEY_LABEL}=${ACCESS_KEY_VALUE}`;

  async getAllEmojis(): Promise<string[]> {
    const response: Response = await fetch(`${EMOJI_API_ORIGIN_HREF}?${this.access_key}`);
    const emojis: any[] = await response.json();
    const transformedEmojis: string[] = this.getOnlyCharacterField(emojis);
    return this.getUniqueEmojis(transformedEmojis);
  }

  private getOnlyCharacterField(emojis: any[]): string[] {
    return emojis.map(({character}) => character);
  }

  private getUniqueEmojis(emojis: string[]): string[] {
    return emojis.splice(START_UNIQUE_EMOJI_INDEX, LAST_UNIQUE_EMOJI_INDEX);
  }
}
