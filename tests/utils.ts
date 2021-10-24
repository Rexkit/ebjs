const platform = process.platform;

export function overridePlatform(value: NodeJS.Platform) {
  Object.defineProperty(process, "platform", {
    value,
    writable: true,
  });
}

export function resetPlatform() {
  Object.defineProperty(process, "platform", {
    value: platform,
    writable: true,
  });
}
