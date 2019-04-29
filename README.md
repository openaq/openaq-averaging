# openaq-averaging
A repo on determining longer-term averages at varying geospatial scales from data accessed from the OpenAQ Platform. 

See "Issues" for latest discussion and some code snippets.

***

## **A. Motivation for deriving longer-term averages from ambient air pollution data**

In order to assess the long-term health impacts of air pollution exposure in a given city or country, scientists rely on long-term (e.g. annual averaged) ambient air quality data produced from ground monitoring sources. Such ground monitoring data can be useful - or even necessary - to help derive accurate estimates of ground level air pollution from satellite products and chemical transport models. [Here](https://www.who.int/airpollution/data/AAP_BoD_methods_Apr2018_final.pdf) is one example of how the World Health Organization takes these annual average city-level values, along with other data sources, to derive the global burden of disease of air pollution.

One such database of annual level city and country level PM2.5 and PM10 pollution is the [World Health Organization's Annual Outdoor Air Quality Database](https://www.who.int/airpollution/data/cities/en/) (see [here](https://www.who.int/airpollution/data/aap_air_quality_database_2018_v14.xlsx?ua=1) for linked 2018 database in Excel). This source of ground monitoring data is used by the World Health Organization (WHO) to estimate the global burden of disease of air pollution, as mentioned above (see [here](https://www.who.int/airpollution/data/AAP_BoD_methods_Apr2018_final.pdf) again).

**The WHO effort to create this global database helps create a comprehensive global landscape of long-term air qualty trends, but it does have two major shortcomings:**

**1. Annual average city-level data are not current.** 

For instance, only 0.27% of cities from the 2018 WHO Air Quality Database report annual average PM2.5 values from 2017, the most current year for which an annual average could be created in 2018.

![Screen Shot 2019-04-29 at 12 13 24 PM](https://user-images.githubusercontent.com/13404290/56910325-59fec780-6a78-11e9-9cec-7e1b59d15c50.png)


**2. Annual average city-level values are not synchronous with one another from year to year.**

This is demonstrated in the figure above, but is also evident when scanning a handful of cities from the 2018 database: 

![Screen Shot 2019-04-29 at 11 46 23 AM](https://user-images.githubusercontent.com/13404290/56908504-6f71f280-6a74-11e9-9607-b82a43ea0053.png)


## **B. How Data Accessed from the OpenAQ Platform Can Help Generate a More Up-To-Date and Synchronous Global Picture**

Two major advantages of using data accessed from the OpenAQ platform is that one can get a) much more up-to-date annual average values that are b) collected synchronously from 2656 cities in 70 countries.

Since data are captured in near-real time and uniformly formatted on the OpenAQ Platform, creating annual averages at a given geospatial scale becomes much more automated. 

Yet, there are also significant issues with relying on OpenAQ for these annual averages alone. Some of those issues may be addressed with data cleaning, while others are inherent to the manner of the data collection and cannot replace other, more traditional, data-gathering methods. Some of these items are addressed in the Issues in this Repo, and we welcome further input from the community (via contributions to discussion and code in this GitHub repo). 


