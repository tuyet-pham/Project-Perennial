#include <iostream>
#include <vector>
#include <cstdlib>
#include <string>
#include <fstream>
#include <sstream>
#include <iomanip>
using namespace std;

int main()
{
    stringstream round;
    string temp;
    string start = "curl -X PUT http://127.0.0.1:5984/plant_types/";
    string plant = " -d '{\"plant\":\"";
    string moisture = "\",\"min_moisture\":\"";
    string end = "\"}'";
    float temp2;
    vector<string> storage;
    vector<double> storage2;
    ifstream infile;

    infile.open("data.txt");
    for(int i = 0; i < 61; i++)
    {
        getline(infile,temp);
        storage.push_back(temp);
    }
    for(int i = 0; i < 61; i++)
    {
        infile >> temp2;
        temp2 /= 100;
        storage2.push_back(temp2);
    }

    ofstream onfile;
    onfile.open("newData.txt");

    for(int i = 0; i < storage.size(); i++)
    {
        round << fixed << setprecision(2) << storage2[i];
        temp = start + to_string(i+1) + plant + storage[i] + moisture + round.str() + end + "\n";
        round.str("");
        onfile << temp;
    }
    onfile.close();
    
    infile.close();
}