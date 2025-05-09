// GET, POST 응답으로 받을 타입

export type PostImageResponse = {
  image_id: number;
  travelogue_image_id: number;
  file_name: string;
  url: string;
  caption: string;
  draft: boolean;
  final: boolean;
  is_in_travelogue: boolean;
};

export type PostWhoWhyResponse = {
  purpose_list: {
    purpose_id: number;
    travelogue_id: number;
    purpose_category: number;
  }[];
  travel_question_response_list: {
    image_question_response_id: number;
    travelogue_id: number;
    who: string[];
  }[];
};

export type SelectedImage = {
  image_id: number;
  image_url: string;
};

export type PatchImageSelectionResponse = {
  selected_images: SelectedImage[];
};

export type PostImageSelectionSecondResponse = {
  caption_list: string[]; // 확정 아님
};

export type ImageMetadataItem = {
  image_id: number;
  created_at: string;
  location: string;
};

export type GetImageMetadataNoneResponse = {
  image_metadata_list: ImageMetadataItem[];
};