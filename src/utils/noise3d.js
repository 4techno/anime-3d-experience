/**
 * Procedural Simplex & Curl Noise Mathematics for WebGL Particle Dynamics
 * Optimized for high-throughput 60 FPS animation loops.
 */

// Permutation table for noise hashing
const PERM = new Uint8Array(512);
const P = [
  151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,
  8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,
  35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,
  134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,
  55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,
  18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,
  250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,
  189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,
  172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,
  228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,
  107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
];

for (let i = 0; i < 256; i++) {
  PERM[i] = P[i];
  PERM[256 + i] = P[i];
}

const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;

/**
 * 3D Simplex noise generator
 */
export function simplex3D(x, y, z) {
  let s = (x + y + z) * F3;
  let i = Math.floor(x + s);
  let j = Math.floor(y + s);
  let k = Math.floor(z + s);
  let t = (i + j + k) * G3;

  let x0 = x - (i - t);
  let y0 = y - (j - t);
  let z0 = z - (k - t);

  let i1, j1, k1;
  let i2, j2, k2;

  if (x0 >= y0) {
    if (y0 >= z0) {
      i1 = 1; j1 = 0; k1 = 0;
      i2 = 1; j2 = 1; k2 = 0;
    } else if (x0 >= z0) {
      i1 = 1; j1 = 0; k1 = 0;
      i2 = 1; j2 = 0; k2 = 1;
    } else {
      i1 = 0; j1 = 0; k1 = 1;
      i2 = 1; j2 = 0; k2 = 1;
    }
  } else {
    if (y0 < z0) {
      i1 = 0; j1 = 0; k1 = 1;
      i2 = 0; j2 = 1; k2 = 1;
    } else if (x0 < z0) {
      i1 = 0; j1 = 1; k1 = 0;
      i2 = 0; j2 = 1; k2 = 1;
    } else {
      i1 = 0; j1 = 1; k1 = 0;
      i2 = 1; j2 = 1; k2 = 0;
    }
  }

  let x1 = x0 - i1 + G3;
  let y1 = y0 - j1 + G3;
  let z1 = z0 - k1 + G3;
  let x2 = x0 - i2 + 2.0 * G3;
  let y2 = y0 - j2 + 2.0 * G3;
  let z2 = z0 - k2 + 2.0 * G3;
  let x3 = x0 - 1.0 + 3.0 * G3;
  let y3 = y0 - 1.0 + 3.0 * G3;
  let z3 = z0 - 1.0 + 3.0 * G3;

  let ii = i & 255;
  let jj = j & 255;
  let kk = k & 255;

  let n0 = 0.0, n1 = 0.0, n2 = 0.0, n3 = 0.0;

  let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
  if (t0 > 0) {
    t0 *= t0;
    let gi0 = PERM[ii + PERM[jj + PERM[kk]]] % 12;
    n0 = t0 * t0 * grad(gi0, x0, y0, z0);
  }

  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
  if (t1 > 0) {
    t1 *= t1;
    let gi1 = PERM[ii + i1 + PERM[jj + j1 + PERM[kk + k1]]] % 12;
    n1 = t1 * t1 * grad(gi1, x1, y1, z1);
  }

  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
  if (t2 > 0) {
    t2 *= t2;
    let gi2 = PERM[ii + i2 + PERM[jj + j2 + PERM[kk + k2]]] % 12;
    n2 = t2 * t2 * grad(gi2, x2, y2, z2);
  }

  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
  if (t3 > 0) {
    t3 *= t3;
    let gi3 = PERM[ii + 1 + PERM[jj + 1 + PERM[kk + 1]]] % 12;
    n3 = t3 * t3 * grad(gi3, x3, y3, z3);
  }

  return 32.0 * (n0 + n1 + n2 + n3);
}

function grad(hash, x, y, z) {
  let h = hash & 15;
  let u = h < 8 ? x : y;
  let v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

/**
 * Procedural 3D Curl Noise for divergent-free particle fields
 */
export function curlNoise3D(x, y, z, eps = 0.001) {
  let dx = (simplex3D(x, y + eps, z) - simplex3D(x, y - eps, z)) / (2 * eps);
  let dy = (simplex3D(x, y, z + eps) - simplex3D(x, y, z - eps)) / (2 * eps);
  let dz = (simplex3D(x + eps, y, z) - simplex3D(x - eps, y, z)) / (2 * eps);

  return {
    x: dy - dz,
    y: dz - dx,
    z: dx - dy
  };
}

/**
 * Utility to export and serialize custom preset definitions
 */
export function exportPresetJson(preset) {
  const payload = {
    ...preset,
    schemaVersion: "2.1",
    exportedAt: new Date().toISOString(),
    engine: "Three.js 0.186 + Simplex3D"
  };
  return JSON.stringify(payload, null, 2);
}
