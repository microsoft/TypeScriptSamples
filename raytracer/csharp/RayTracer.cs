using System;

namespace SimpleRaytracing
{
    public class RayTracer
    {
        public int maxDepth = 5;

        private Intersection intersections(Ray ray, Scene scene)
        {
            var closest = float.MaxValue;
            Intersection closestInter = null;
            for (int i = 0; i < scene.thingsCount; ++i)
            {
                var inter = scene.things[i].intersect(ray);
                if (inter != null && inter.dist < closest)
                {
                    closest = inter.dist;
                    closestInter = inter;
                }
            }

            return closestInter;
        }

        private float testRay(Ray ray, Scene scene)
        {
            var isect = this.intersections(ray, scene);
            if (isect != null)
            {
                return isect.dist;
            }

            return float.MaxValue;
        }


        private Color traceRay(Ray ray, Scene scene, int depth)
        {
            var isect = this.intersections(ray, scene);
            if (isect == null)
            {
                return Color.background;
            }
            else
            {
                return this.shade(isect, scene, depth);
            }
        }

        private Color shade(Intersection isect, Scene scene, int depth)
        {
            var d = isect.ray.dir;
            var pos = Vector.plus(Vector.times(isect.dist, d), isect.ray.start);
            var normal = isect.thing.normal(pos);
            var reflectDir = Vector.minus(d, Vector.times(2, Vector.times(Vector.dot(normal, d), normal)));
            var naturalColor = Color.plus(Color.background,
                                          this.getNaturalColor(isect.thing, pos, normal, reflectDir, scene));
            var reflectedColor = (depth >= this.maxDepth) ? Color.grey : this.getReflectionColor(isect.thing, pos, normal, reflectDir, scene, depth);
            return Color.plus(naturalColor, reflectedColor);
        }

        private Color getReflectionColor(Thing thing, Vector pos, Vector normal, Vector rd, Scene scene, int depth)
        {
            Color traced = this.traceRay(new Ray(pos, rd), scene, depth + 1);
            return Color.scale(thing.surface.reflect(pos), traced);
        }

        private Color addLight(Vector pos, Scene scene, Vector norm, Vector rd, Thing thing, Color col, Light light)
        {
            var ldis = Vector.minus(light.pos, pos);
            var livec = Vector.norm(ldis);
            var neatIsect = this.testRay(new Ray(pos, livec), scene);
            var isInShadow = (neatIsect == float.MaxValue) ? false : (neatIsect <= Vector.mag(ldis));
            if (isInShadow)
            {
                return col;
            }
            else
            {
                var illum = Vector.dot(livec, norm);
                var lcolor = (illum > 0) ? Color.scale(illum, light.color) : Color.defaultColor;
                var specular = Vector.dot(livec, Vector.norm(rd));
                var scolor = (specular > 0) ? Color.scale((float)Math.Pow(specular, thing.surface.roughness), light.color) : Color.defaultColor;
                return Color.plus(col, Color.plus(Color.times(thing.surface.diffuse(pos), lcolor), Color.times(thing.surface.specular(pos), scolor)));
            }
        }

        private Color getNaturalColor(Thing thing, Vector pos, Vector norm, Vector rd, Scene scene)
        {
            Color result = Color.defaultColor;
            for (int i = 0; i < scene.lightsCount; ++i)
            {
                result = addLight(pos, scene, norm, rd, thing, result, scene.lights[i]);
            }

            return result;
        }

        private float recenterX(float x, float screenWidth)
        {
            return (x - (screenWidth / 2.0F)) / 2.0F / screenWidth;
        }

        private float recenterY(float y, float screenHeight)
        {
            return -(y - (screenHeight / 2.0F)) / 2.0F / screenHeight;
        }

        private Vector getPoint(float x, float y, Camera camera, float screenWidth, float screenHeight)
        {
            return Vector.norm(Vector.plus(camera.forward, Vector.plus(Vector.times(recenterX(x, screenWidth), camera.right), Vector.times(recenterY(y, screenHeight), camera.up))));
        }

        public void render(Scene scene, float screenWidth, float screenHeight, Color[] image)
        {
            for (int y = 0; y < screenHeight; ++y)
            {
                for (int x = 0; x < screenWidth; ++x)
                {
                    var color = this.traceRay(new Ray(scene.camera.pos, getPoint(x, y, scene.camera, screenWidth, screenHeight)), scene, 0);
                    var c = Color.toDrawingColor(color);
                    image[(int)(y * screenWidth + x)] = c;
                }
            }
        }
    }
}
