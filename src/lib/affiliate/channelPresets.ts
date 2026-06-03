// One-click UTM presets for common sharing channels. Affiliate never types "utm".

export interface ChannelPreset {
  id:     string;        // matches the chip key
  label:  string;        // chip text
  emoji:  string;        // small visual cue (no SVG to keep bundle light)
  source: string;        // utm_source
  medium: string;        // utm_medium
}

export const CHANNEL_PRESETS: ChannelPreset[] = [
  { id: "whatsapp",  label: "WhatsApp",  emoji: "💬", source: "whatsapp",  medium: "messaging" },
  { id: "instagram", label: "Instagram", emoji: "📸", source: "instagram", medium: "social"    },
  { id: "facebook",  label: "Facebook",  emoji: "👤", source: "facebook",  medium: "social"    },
  { id: "tiktok",    label: "TikTok",    emoji: "🎵", source: "tiktok",    medium: "social"    },
  { id: "email",     label: "Email",     emoji: "✉️", source: "email",     medium: "email"     },
];
