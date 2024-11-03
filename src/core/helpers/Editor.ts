import type { EditorOutputData } from '@4dk.dto/kit/ui';
import { ILessonEntity } from '@4dk.dto/kit/services/course/lesson';

export class EditorHelper {
  public static parseStringToEditor(jsonString: string): EditorOutputData {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return { blocks: [] };
    }
  }

  public static parseEditorToString(json: EditorOutputData) {
    try {
      return JSON.stringify(json);
    } catch (e) {
      return JSON.stringify({ blocks: [] });
    }
  }

  public static parseDocumentsToString(json: ILessonEntity['documents']) {
    try {
      return json.map((document) => JSON.stringify(document));
    } catch (e) {
      return [];
    }
  }

  public static parseDocumentsToClient(array: string[]): ILessonEntity['documents'] {
    try {
      return array.map((el) => JSON.parse(el));
    } catch (e) {
      return [];
    }
  }
}
