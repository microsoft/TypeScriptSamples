using System;
using System.Diagnostics;
using System.Drawing;

namespace SimpleRaytracing
{
    class Program
    {
        static void Main(string[] args)
        {
            var defaultScene = new Scene();
            defaultScene.camera = new Camera(new Vector(3.0F, 2.0F, 4.0F), new Vector(-1.0F, 0.5F, 0.0F));
            defaultScene.things = new Thing[3]
            {
                new Plane(new Vector(0.0F, 1.0F, 0.0F), 0.0F, new Surfaces.CheckerBoard()),
                new Sphere(new Vector(0.0F, 1.0F, -0.25F), 1.0F, new Surfaces.Shiny()),
                new Sphere(new Vector(-1.0F, 0.5F, 1.5F), 0.5F, new Surfaces.Shiny())
            };
            defaultScene.lights = new Light[4]
            {
                new Light { pos= new Vector(-2.0F, 2.5F, 0.0F), color= new Color(0.49F, 0.07F, 0.07F) },
                new Light { pos= new Vector(1.5F, 2.5F, 1.5F),  color= new Color(0.07F, 0.07F, 0.49F) },
                new Light { pos= new Vector(1.5F, 2.5F, -1.5F), color= new Color(0.07F, 0.49F, 0.071F) },
                new Light { pos= new Vector(0.0F, 3.5F, 0.0F),  color= new Color(0.21F, 0.21F, 0.35F) }
            };
            defaultScene.lightsCount = 4;
            defaultScene.thingsCount = 3;

            var width = 2048;
            var height = 2048;
            Color[] result = new Color[width * height];
            var rt = new RayTracer();
            Stopwatch watch = new Stopwatch();
            watch.Start();
            rt.render(defaultScene, width, height, result);
            watch.Stop();
            Console.WriteLine("rendering time : " + watch.ElapsedMilliseconds);

            Bitmap image = new Bitmap(width, height);
            for(int y = 0; y < height; ++y)
            {
                for(int x = 0; x < width; ++x)
                {
                    Color pix = result[y * width + x];
                    image.SetPixel(x, y, System.Drawing.Color.FromArgb((int) pix.r, (int) pix.g, (int) pix.b));
                }
            }

            image.Save("result.png");
            Process.Start("result.png");
        }
    }
}
