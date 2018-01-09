/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  GBowden
 * Created: Nov 29, 2017
 */

SELECT jp.job_poster_id as id,
jpd.job_poster_desc_title as title,
jpd.job_poster_desc_content as description,
(SELECT count(*) FROM tc.job_poster_application jpa WHERE jpa.application_job_poster_id = jp.job_poster_id) as applicants_to_date,
jp.job_poster_term_qty as term_qty,
jt.job_term as term_units,
jl_1.job_level as job_min_level,
jl_2.job_level as job_max_level,
jp.job_poster_start_date as job_start_date,
jp.job_poster_end_date as job_end_date,
jp.job_poster_close_date_time as close_date,
dd.department_details_name as department,
pd.province_details_name as location_province,
cd.city_details_name as location_city
FROM tc.job_poster jp, 
		tc.job_poster_details jpd, 
	tc.locale l, 
	tc.job_term jt, 
	tc.job_level jl_1, 
	tc.job_level jl_2, 
	tc.department d, 
	tc.department_details dd,
	tc.province p,
	tc.province_details pd,
	tc.city c,
	tc.city_details cd
WHERE jpd.job_poster_id = jp.job_poster_id
AND l.locale_iso = 'en_CA'
AND jpd.locale_id = l.locale_id
AND jt.job_term_id = jp.job_term_id
AND jl_1.job_level_id = jp.job_poster_job_min_level_id
AND jl_2.job_level_id = jp.job_poster_job_max_level_id
AND d.department_id = jp.job_poster_department_id
AND dd.department_id = d.department_id
AND dd.deparment_details_locale_id = l.locale_id
AND jp.job_poster_department_id = d.department_id
AND pd.province_details_locale_id = l.locale_id
AND pd.province_details_province_id = p.province_id
AND p.province_id = d.department_province_id
AND cd.city_details_city_id = c.city_id
AND d.department_city_id = c.city_id
AND cd.city_details_locale_id = l.locale_id