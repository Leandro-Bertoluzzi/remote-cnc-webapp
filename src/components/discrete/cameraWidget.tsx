import config from "@/config";

export default function CameraWidget() {
    const { CAMERA_URL } = config;

    return (
        <iframe
            src={CAMERA_URL}
            allow="fullscreen"
            className="aspect-video w-full rounded-2xl border border-slate-300"
        />
    );
}
