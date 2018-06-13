namespace SimpleRaytracing
{
    public class Ray
    {
        public Vector start { get; set; }
        public Vector dir { get; set; }

        public Ray(Vector pos, Vector rd)
        {
            start = pos;
            dir = rd;
        }
    }

    public class Intersection
    {
        public Thing thing { get; set; }
        public Ray ray { get; set; }
        public float dist { get; set; }
    }

    public interface Surface
    {
        Color diffuse(Vector pos);
        Color specular(Vector pos);
        float reflect(Vector pos);
        float roughness { get; }
    }

    public interface Thing
    {
        Intersection intersect(Ray ray);
        Vector normal(Vector pos);
        Surface surface { get; set; }
    }

    public class Light
    {
        public Vector pos { get; set; }
        public Color color { get; set; }
    }

    public class Scene
    {
        public Thing[] things { get; set; }
        public Light[] lights { get; set; }
        public Camera camera { get; set; }
        public int thingsCount { get; set; }
        public int lightsCount { get; set; }
    }
}
