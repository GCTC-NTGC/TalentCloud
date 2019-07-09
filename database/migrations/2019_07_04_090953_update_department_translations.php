<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateDepartmentTranslations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::dropIfExists('department_translations');
        Schema::table('department_translations', function (Blueprint $table) {
            $table->longText('impact')->nullable();
        });

        DB::table('department_translations')->whereIn('id', [1])->update([
            'value' => 'Treasury Board of Canada Secretariat',
            'impact' => 'The Treasury Board of Canada Secretariat provides advice and makes recommendations on how the government spends money, how it regulates and how it is managed ensuring tax dollars are spent wisely and effectively for Canadians.'
        ]);
        DB::table('department_translations')->whereIn('id', [2])->update([
            'value' => 'Secrétariat du Conseil du Trésor du Canada',
            'impact' => 'Le Secrétariat du Conseil du Trésor du Canada fournit des conseils et des recommandations sur la façon dont le gouvernement investit dans les programmes et les services, ainsi que sur la façon dont il en assure la réglementation et la gestion pour faire en sorte que l\'argent des contribuables soit utilisé de manière judicieuse et efficace pour les Canadiens.'
        ]);
        DB::table('department_translations')->whereIn('id', [3])->update([
            'value' => 'Natural Resources Canada',
            'impact' => 'Natural Resources Canada seeks to enhance the responsible development and use of Canada\'s natural resources and the competitiveness of Canada\'s natural resources products.'
        ]);
        DB::table('department_translations')->whereIn('id', [4])->update([
            'value' => 'Ressources naturelles Canada',
            'impact' => 'Ressources naturelles Canada cherche à renforcer le développement et l\'utilisation responsables des ressources naturelles du Canada et la compétitivité des produits tirés des ressources naturelles du pays.'
        ]);
        DB::table('department_translations')->whereIn('id', [5])->update([
            'value' => 'Transport Canada',
            'impact' => 'Transport Canada works to serve the public interest through the promotion of a safe and secure, efficient and environmentally responsible transportation system in Canada.'
        ]);
        DB::table('department_translations')->whereIn('id', [6])->update([
            'value' => 'Transports Canada',
            'impact' => 'Transports Canada sert l\'intérêt public en favorisant un réseau de transport au Canada qui est sûr et sécuritaire, efficace et respectueux de l\'environnement.'
        ]);
        DB::table('department_translations')->whereIn('id', [7])->update([
            'value' => 'Environment and Climate Change Canada',
            'impact' => 'ECCC informs Canadians about protecting and conserving our natural heritage, and ensuring a clean, safe and sustainable environment for present and future generations.'
        ]);
        DB::table('department_translations')->whereIn('id', [8])->update([
            'value' => 'Environnement et Changement climatique Canada',
            'impact' => 'Environnement et Changement climatique Canada s\'engage à protéger l\'environnement, à conserver le patrimoine naturel du pays et à fournir des renseignements météorologiques pour tenir les Canadiens informés et en sécurité.'
        ]);
        DB::table('department_translations')->whereIn('id', [9])->update([
            'value' => 'Employment and Social Development Canada',
            'impact' => 'Employment and Social Development Canada (ESDC) works to improve the standard of living and quality of life for all Canadians. We do this by promoting a labour force that is highly skilled. We also promote an efficient and inclusive labour market.'
        ]);
        DB::table('department_translations')->whereIn('id', [10])->update([
            'value' => 'Emploi et Développement social Canada',
            'impact' => 'Emploi et Développement social Canada (EDSC) travaille à améliorer le niveau de vie et la qualité de vie de tous les Canadiens en faisant la promotion d\'une main-d\'œuvre mobile et hautement spécialisée ainsi que d\'un marché du travail efficace et favorable à l\'inclusion.'
        ]);
        DB::table('department_translations')->whereIn('id', [11])->update([
            'value' => 'Global Affairs Canada',
            'impact' => 'Global Affairs Canada manages Canada\'s diplomatic relations, provides consular services to Canadians, promotes the country\'s international trade, and leads Canada\'s international development and humanitarian assistance.'
        ]);
        DB::table('department_translations')->whereIn('id', [12])->update([
            'value' => 'Affaires mondiales Canada',
            'impact' => 'Affaires mondiales Canada gère les relations diplomatiques du Canada, fournit les services consulaires aux canadiens, fait la promotion du commerce international du pays et dirige le développement international et l\'aide humanitaire du Canada.'
        ]);
        DB::table('department_translations')->whereIn('id', [13])->update([
            'value' => 'Canada Border Services Agency',
            'impact' => 'The Canada Border Services Agency (CBSA) facilitates the flow of legitimate travellers and trade. The Agency also enforces more than 90 acts and regulations that keep our country and Canadians safe.'
        ]);
        DB::table('department_translations')->whereIn('id', [14])->update([
            'value' => 'Agence des services frontaliers du Canada',
            'impact' => 'L\'Agence des services frontaliers du Canada (ASFC) facilite la circulation des voyageurs et des marchandises commerciales légitimes. L\'Agence applique aussi plus de 90 lois et règlements qui assurent la sécurité du pays et des Canadiens.'
        ]);
        DB::table('department_translations')->whereIn('id', [15])->update([
            'value' => 'Shared Services Canada',
            'impact' => 'Shared Services Canada (SSC) delivers digital services to Government of Canada organizations. We provide modern, secure and reliable IT services so federal organizations can deliver digital programs and services that meet Canadians needs.'
        ]);
        DB::table('department_translations')->whereIn('id', [16])->update([
            'value' => 'Services partagés Canada',
            'impact' => 'Services partagés Canada (SPC) offre des services numériques aux organismes du gouvernement du Canada. Nous offrons des services de TI modernes, sécurisés et fiables pour permettre aux organismes fédéraux d\'offrir des programmes et des services numériques qui répondent aux besoins des Canadiens et des Canadiennes.'
        ]);
        DB::table('department_translations')->whereIn('id', [17])->update([
            'value' => 'Innovation, Science and Economic Development Canada',
            'impact' => 'Innovation, Science and Economic Development Canada (ISED) works with Canadians in all areas of the economy and in all parts of the country to improve conditions for investment, enhance Canada\'s innovation performance, increase Canada\'s share of global trade and build a fair, efficient and competitive marketplace.'
        ]);
        DB::table('department_translations')->whereIn('id', [18])->update([
            'value' => 'Innovation, Sciences et Développement économique Canada',
            'impact' => 'Innovation, Sciences et Développement économique Canada (ISDE) travaille avec les Canadiens de tous les secteurs de l\'économie et de toutes les régions du pays à instaurer un climat favorable à l\'investissement, à stimuler l\'innovation, à accroître la présence canadienne sur les marchés mondiaux et à créer un marché équitable, efficace et concurrentiel.'
        ]);
        DB::table('department_translations')->whereIn('id', [19])->update([
            'value' => 'Public Services and Procurement Canada',
            'impact' => 'Public Services and Procurement Canada serves federal departments and agencies as their central purchasing agent, real property manager, treasurer, accountant, pay and pension administrator, integrity adviser and linguistic authority.'
        ]);
        DB::table('department_translations')->whereIn('id', [20])->update([
            'value' => 'Services publics et Approvisionnement Canada',
            'impact' => 'Services publics et Approvisionnement Canada sert les ministères et organismes fédéraux en tant qu\'acheteur central, gestionnaire de biens immobiliers, trésorier, comptable, administrateur de la paye et des pensions, conseiller en matière d\'intégrité et spécialiste des questions linguistiques.'
        ]);
        DB::table('department_translations')->whereIn('id', [21])->update([
            'value' => 'Department of National Defence',
            'impact' => 'The Department of National Defence and the Canadian Armed Forces implement government decisions concerning the defence of Canadians\' interests at home and abroad.'
        ]);
        DB::table('department_translations')->whereIn('id', [22])->update([
            'value' => 'Ministère de la Défense nationale',
            'impact' => 'Le ministère de la Défense nationale et les Forces armées canadiennes mettent en œuvre les décisions du gouvernement en ce qui concerne la défense des intérêts canadiens au pays et à l\'étranger.'
        ]);
        DB::table('department_translations')->whereIn('id', [23])->update([
            'value' => 'Health Canada',
            'impact' => 'Health Canada is responsible for helping Canadians maintain and improve their health. It ensures that high-quality health services are accessible, and works to reduce health risks.'
        ]);
        DB::table('department_translations')->whereIn('id', [24])->update([
            'value' => 'Santé Canada',
            'impact' => 'Santé Canada a pour mandat d\'aider les Canadiens à conserver et à améliorer leur santé. Il s\'assure d\'offrir des services de santé de grande qualité, et cherche à réduire les risques pour la santé.'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('department_translations', function (Blueprint $table) {
            $table->dropColumn('impact');
            $table->getChangedColumns('value');
        });
    }
}
