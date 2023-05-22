import { Translation } from "@prisma/client";
import prisma from "./prisma";

export const updateTranslations = async (...translations: Translation[]) => {
  return await Promise.all(
    translations.map(async ({ text_id, language_code, text }) => {
      await prisma.translation.update({
        data: { text },
        where: {
          text_id_language_code: {
            text_id,
            language_code,
          },
        },
      });
    })
  );
};
