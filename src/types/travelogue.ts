export type UploadImageResponse = {
    image_id: number;
    travelogue_image_id: number;
    file_name: string;
    uri: string;
    caption: string;
    draft: boolean;
    final: boolean;
    is_in_travelogue: boolean;
  };