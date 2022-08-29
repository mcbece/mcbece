import { resolvePath } from "./util.js"

import commonjs from "@rollup/plugin-commonjs"
import alias from "@rollup/plugin-alias"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { uglify } from "rollup-plugin-uglify"

export default function(banner, pkg) {
    return [
        // core
        _({
            src: "./lib/core/index.js",
            dest: "lib/core.min.js",
            name: "core"
        }),
        
        // bundle.js
        _({
            src: "index.js",
            dest: "bundle.min.js",
            name: "bundle"
        }),
        
        // custom file
        _({
            src: "data/example.js",
            dest: "custom/example.min.js",
            name: "custom-file-example"
        }),
        _({
            src: "data/dev.js",
            dest: "custom/dev.min.js",
            name: "custom-file-dev"
        })
    ]
    
    function _({ src, dest, name: _name }) {
        const name = `${pkg.name}${ _name ? `-${_name}` : "" }.js`
        return {
            name, 
            input: src.startsWith(".") ? src : `./src/browser/js/${src}`,
            output: {
                file: dest.startsWith(".") ? dest : `./public/js/${dest}`,
                strict: true,
                sourcemap: true,
                format: "es"
            },
            plugins: [
                nodeResolve({
                    preferBuiltins: false
                }),
                alias({
                    entries: [
                        {
                            find: /^\@\//,
                            replacement: resolvePath("..", import.meta) + "/"
                        },
                        {
                            find: /^\@core\//,
                            replacement: resolvePath("../lib/core", import.meta) + "/"
                        },
                        {
                            find: /^\@util\//,
                            replacement: resolvePath("../lib/util", import.meta) + "/"
                        },
                        {
                            find: /^\@lib\//,
                            replacement: resolvePath("../lib", import.meta) + "/"
                        }
                    ]
                }),
                commonjs(),
                uglify({
                    output: {
                        preamble: banner(name)
                    }
                })
            ]
        }
    }
}
