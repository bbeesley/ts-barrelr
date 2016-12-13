import * as fs from "fs";
import * as path from "path";

export default class FileGatherer {
     gather(directory: string) : Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            fs.readdir(directory, (err, files) => {
                if(err){
                    console.log(err);
                    reject(err)
                } 
                else
                resolve(this.produceBarreledNames(files, directory));

            })
        })
     }
    
    produceBarreledNames(files: string[], directory): Array<string> {
        let directories: string[] = [];
        let outputFiles: string[] = [];

        files.filter(file => fs.statSync(directory + "/" + file).isDirectory()).forEach((directory) => {
            directories.push(this.produceBarellableName(directory,true));
        });
        files.filter(file => fs.statSync(directory + "/" + file).isFile()).forEach((file) => {
            outputFiles.push(this.produceBarellableName(file,false));
        });

        return directories.concat(outputFiles);
    }

    produceBarellableName(name: string, directory: boolean): string {
        if(directory) {
            return  "./" +  path.basename(name);
        }else {
            return "./" + path.basename(name, ".ts");
        }
    }

}


